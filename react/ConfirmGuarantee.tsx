import React, { useState, useEffect } from 'react'
import { useCssHandles } from 'vtex.css-handles'

import { Utils } from 'vtex.checkout-resources'
import { useRuntime } from 'vtex.render-runtime'
import { agregarAlCarrito } from '../services/vtexApi'
import { getToken } from '../services/getToken'
import { addOrderData } from '../services/orderData'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import styles from './styles/ConfirmGuarantee.css'




const CSS_HANDLES = [
  'modalGuarantee',
  'modalGuaranteeOverlay',
  'modalGuaranteeContainer',
  'guaranteeOptionsContainer',
  'guaranteeOption',
  'guaranteeOptionSelected',
  'closeModalButton',
  'textModal',
  'guaranteeText',
  'guaranteePrice',
  'textContainer',
  'modalFooter',
  'noGuaranteeButton',
  'addToCartWithGuarantee',
  'addToCartWithoutGuarantee'
] as const

const ConfirmGuarantee = () => {
  const [price, setPrice] = useState(0);
  const [productId, setProductId] = useState('');
  const [hasSelectedGuarantee, setHasSelectedGuarantee] = useState(true)
  const [orderFormId, setOrderFormId] = useState('');
  const [guaranteeSelected, setGuaranteSelected] = useState(12);
  const [guaranteePrice, setGuaranteePrice] = useState(0);
  const [showComponent, setShowComponent] = useState(true);
  const [itemsInCart, setItemsInCart] = useState(0);
  const [isOneClickBuy, setIsOneClickbuy] = useState(false)
  const [guaranteeAvailable12, setGuaranteeAvailable12] = useState(275);
  const [guaranteeAvailable24, setGuaranteeAvailable24] = useState(279);
  const [guaranteeClicked, setGuaranteeClicked] = useState(false);
  const [token, setToken] = useState ('')

  const { url: checkoutURL } = Utils.useCheckoutURL()
  const { navigate } = useRuntime()
  const { orderForm } = useOrderForm()

  const guaranteeNumbers12 = [277]

  const guaranteeNumbers24 = [280]

  useEffect(() => {
    const urlObj = new URL(window.location.href);
    const searchParams = new URLSearchParams(urlObj.search);
    const id = searchParams.get("productId");
    const isOneClickBuyString = searchParams.get("isOneClickBuy");
  
    if (id) {
      setProductId(id);
    }
  
    if (isOneClickBuyString) {
      const isOneClickBuyValue = isOneClickBuyString === 'true'; // Convierte la cadena en un valor booleano
      setIsOneClickbuy(isOneClickBuyValue);
    }
  
    setOrderFormId(orderForm.id);
  }, []);
  
  useEffect(() => {
    if (price !== 0) {
      setGuaranteePrice(price * 0.2);
    }
  }, [price]);

  useEffect(() => {
    setOrderFormId(orderForm.id);

    if (orderForm && productId) {
      orderForm.items.map((item: any) => {
        item.productId === productId ? setPrice(item.price) : null;
      })
    }

  }, [orderForm, productId]);

  useEffect(() => {

    if (orderForm) {
      setItemsInCart(orderForm.items.length);

      orderForm.items.forEach((item: any) => {
 
        if (guaranteeSelected === 12 && item.id == guaranteeAvailable12) {
          const updatedAvailable12 = guaranteeNumbers12.find((number: any) => number !== guaranteeAvailable12);
          if (updatedAvailable12 !== undefined) {
            setGuaranteeAvailable12(updatedAvailable12);
          }
        } else if (guaranteeSelected === 24 && item.id == guaranteeAvailable24) {
          const updatedAvailable24 = guaranteeNumbers24.find((number: any) => number !== guaranteeAvailable24);
          if (updatedAvailable24 !== undefined) {
            setGuaranteeAvailable24(updatedAvailable24);
          }
        }
      });
    }
  }, [orderForm, guaranteeSelected]);

  useEffect(() => {
    if (orderForm) {
      if (guaranteeSelected === 12) {
        for (const item of orderForm.items) {
          if (item.productId === guaranteeAvailable12) {
            const newAvailableNumbers = guaranteeNumbers12.filter(number => number !== guaranteeAvailable12);
            if (newAvailableNumbers.length > 0) {
              const newAvailableNumber = newAvailableNumbers[0];
              setGuaranteeAvailable12(newAvailableNumber);
            }
          }
        }
      } else {
        for (const item of orderForm.items) {
          if (item.productId === guaranteeAvailable24) {
            const newAvailableNumbers = guaranteeNumbers24.filter(number => number !== guaranteeAvailable24);
            if (newAvailableNumbers.length > 0) {
              const newAvailableNumber = newAvailableNumbers[0];
              setGuaranteeAvailable24(newAvailableNumber);
            }
          }
        }
      }
    }
  }, [orderForm, guaranteeSelected, guaranteeAvailable12, guaranteeAvailable24]);

  useEffect(() => {
    async function fetchToken() {
        try {
            const tokenData = await getToken();
            setToken(tokenData);
            console.log('TOKEN TEST', tokenData, token);
            console.log(itemsInCart, isOneClickBuy)
        } catch (error) {
            console.error('Error fetching token:', error);
        }
    }
    fetchToken();
}, []);
  

  const handleGuarantee = async () => {
    if (hasSelectedGuarantee) {
      setGuaranteeClicked(true);
      const currentGuaranteePrice = guaranteePrice;

      await agregarAlCarrito(guaranteeSelected === 12 ? guaranteeAvailable12 : guaranteeAvailable24, currentGuaranteePrice, orderFormId, 1);

      await addOrderData(guaranteeSelected === 12 ? guaranteeAvailable12 : guaranteeAvailable24, orderFormId, productId, 'guarantee1'); 

      navigate({ to: checkoutURL });
      setShowComponent(false);
      setTimeout(() => {
        window.location.reload();
      }, 2000); 
    }
  };


  const handleWithoutGuarantee = () => {
    navigate({ to: checkoutURL });
    setShowComponent(false);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  const handles = useCssHandles(CSS_HANDLES)


  const handleClickGuarantee = async (number: number) => {
    if (number === 12) {
      setGuaranteePrice(price * 0.1);
    } else if (number === 24) {
      setGuaranteePrice(price * 0.2);
    }
    setGuaranteSelected(number);
    setHasSelectedGuarantee(true);
  };


  if (guaranteePrice && showComponent) {
    return (
      <div className={handles.modalGuaranteeOverlay}>
        <div className={handles.modalGuarantee}>
          <h2>Añadir una garantía 10</h2>
          <div className={handles.modalGuaranteeContainer}>
            <div className={handles.guaranteeOptionsContainer}>
              <div className={guaranteeSelected === 12 ? handles.guaranteeOptionSelected : handles.guaranteeOption} onClick={() => handleClickGuarantee(12)}>
                <h4>Garantía extendida 12 meses</h4>
                <p className={handles.guaranteeText}><b>Durante un año</b> protegés tu producto</p>
                <p className={handles.guaranteePrice}>${((price / 100) * 0.1).toLocaleString()}</p>
              </div>
              <div className={guaranteeSelected === 24 ? handles.guaranteeOptionSelected : handles.guaranteeOption} onClick={() => handleClickGuarantee(24)}>
                <h4>Garantía extendida 24 meses</h4>
                <p className={handles.guaranteeText}><b>Durante dos años</b> protegés tu producto</p>
                <p className={handles.guaranteePrice} >${((price / 100) * 0.2).toLocaleString()}</p>
              </div>
            </div>
            <div className={handles.textContainer}>
              <span><b>Cuidá tu producto por más tiempo</b>, después de finalizar la garantía de fábrica.</span>
              <p>Que cubre la garantía extendida?</p>
              <ul>
                <li><b>Cubre todo tipo de fallas</b> que no sean por mal uso o accidentes.</li>
                <li><b>Sin limite de reparaciones! </b>con repuestos originales y servicio técnico oficial. </li>
                <li><b>Devolucion del 100% del valor actualizado</b>, si no se puede reparar.</li>
                <li>Si no podemos reparar el producto te indemnizamos <b>con el 80%</b> del valor de reposición del bien.</li>
              </ul>
            </div>
          </div>
          <div className={handles.modalFooter}>

            <button className={handles.addToCartWithoutGuarantee} onClick={handleWithoutGuarantee}> Continuar sin Garantía </button>
            <button className={styles.addToCartWithGuarantee}  onClick={handleGuarantee}> {!guaranteeClicked ? "Añadir Garantía" : <div className={styles.loadingSpinnerButton}></div> } </button>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className={styles.container}>
        <div className={styles.loadingSpinner}></div>
      </div>)
  }

}


export default ConfirmGuarantee