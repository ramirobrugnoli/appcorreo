import React, { useState, useEffect } from 'react'
import { useCssHandles } from 'vtex.css-handles'

import { Utils } from 'vtex.checkout-resources'
import { useRuntime } from 'vtex.render-runtime'
import { agregarAlCarrito } from '../services/vtexApi'
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
  const [guaranteeSelected, setGuaranteSelected] = useState(24);
  const [guaranteePrice, setGuaranteePrice] = useState(0);
  const [showComponent, setShowComponent] = useState(true);
/*   const [index, setIndex] = useState (localStorage.getItem('index') || 0) */
  const [index, setIndex] = useState (10)
  const { url: checkoutURL } = Utils.useCheckoutURL()
  const { navigate } = useRuntime()
  const { orderForm } = useOrderForm()

  console.log('productId: ', productId, 'orderFormId: ', orderFormId);

  useEffect(() => {
    const urlObj = new URL(window.location.href);
    const searchParams = new URLSearchParams(urlObj.search);
    const id = searchParams.get("productId")!;

    setProductId(id);
    setOrderFormId(orderForm.id);
  }, []);


  useEffect(() => {
    if (price !== 0) {
      setGuaranteePrice(price * 0.2);
    }
    console.log('price:', price);
  }, [price]);

  useEffect(() => {
    setOrderFormId(orderForm.id);

    if (orderForm && productId) {
      orderForm.items.map((item: any) => {
        item.id === productId ? setPrice(item.price) : null;
      })
    }

  }, [orderForm, productId]);




  const handleGuarantee = async () => {
    if (hasSelectedGuarantee) {
      const currentGuaranteePrice = guaranteePrice;
      console.log('current guarantee enviada a API:', currentGuaranteePrice);
      console.log('index enviado a funcion:', index);
      await agregarAlCarrito(8, currentGuaranteePrice, orderFormId, Number(index));
      const newIndex = Number(index) + 1;
      setIndex(newIndex);
      if (typeof window !== 'undefined') {
        localStorage.setItem('index', String(newIndex));
      }
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
      console.log('price:', price);
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
          <h2>Añadir una protección service testxx</h2>
          <div className={handles.modalGuaranteeContainer}>
            <div className={handles.guaranteeOptionsContainer}>
              <div className={guaranteeSelected === 12 ? handles.guaranteeOptionSelected : handles.guaranteeOption} onClick={() => handleClickGuarantee(12)}>
                <h4>Garantía extendida 12 meses</h4>
                <p className={handles.guaranteeText}><b>Durante un año</b> protegés tu producto</p>
                <p className={handles.guaranteePrice}>${((price / 100) * 1.1).toLocaleString()}</p>
              </div>
              <div className={guaranteeSelected === 24 ? handles.guaranteeOptionSelected : handles.guaranteeOption} onClick={() => handleClickGuarantee(24)}>
                <h4>Garantía extendida 24 meses</h4>
                <p className={handles.guaranteeText}><b>Durante dos años</b> protegés tu producto</p>
                <p className={handles.guaranteePrice} >${((price / 100) * 1.2).toLocaleString()}</p>
              </div>
            </div>
            <div className={handles.textContainer}>
              <span><b>Cuidá tu producto por más tiempo</b>, después de finalizar la garantía de fábrica.</span>
              <ul>
                <li><b>Cubre todo tipo de fallas</b> que no sean por mal uso o accidentes.</li>
                <li><b>Sin limite de reparaciones! </b>con repuestos originales y servicio técnico oficial. </li>
                <li><b>Devolucion del 100% del valor actualizado</b>, si no se puede reparar.</li>
              </ul>
            </div>
          </div>
          <div className={handles.modalFooter}>

            <button className={handles.addToCartWithoutGuarantee} onClick={handleWithoutGuarantee}> Continuar sin Garantía </button>
            <button className={handles.addToCartWithGuarantee} onClick={handleGuarantee}> Añadir Protección </button>
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