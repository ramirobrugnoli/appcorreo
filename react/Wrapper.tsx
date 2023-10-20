
import React, { useMemo, useEffect, useState } from 'react'
import { useProduct } from 'vtex.product-context'
import type { ProductTypes } from 'vtex.product-context'
import { withToast } from 'vtex.styleguide'

import AddToCartButton from './AddToCartButton'
import { mapCatalogItemToCart, CartItem } from './modules/catalogItemToCart'
import { AssemblyOptions } from './modules/assemblyOptions'




interface Props {
  isOneClickBuy: boolean
  isOneClickBuy2: boolean
  available: boolean
  disabled: boolean
  customToastUrl?: string
  customOneClickBuyLink?: string
  showToast: Function
  selectedSeller?: ProductTypes.Seller
  text?: string
  unavailableText?: string
  onClickBehavior?:
  | 'add-to-cart'
  | 'go-to-product-page'
  | 'ensure-sku-selection'
  onClickEventPropagation?: 'disabled' | 'enabled'
  skuItems?: CartItem[]
  customPixelEventId?: string
  addToCartFeedback?: 'toast' | 'customEvent'
}

function checkAvailability(
  isEmptyContext: boolean,
  seller: ProductTypes.Seller | undefined,
  availableProp: Props['available']
) {
  if (isEmptyContext) {
    return false
  }
  if (availableProp != null) {
    return availableProp
  }

  const availableProductQuantity = seller?.commertialOffer?.AvailableQuantity

  return Boolean(availableProductQuantity)
}

function checkDisabled(
  isEmptyContext: boolean,
  assemblyOptions: AssemblyOptions | undefined,
  disabledProp: Props['disabled']
) {
  if (isEmptyContext) {
    return true
  }
  if (disabledProp != null) {
    return disabledProp
  }

  const groupsValidArray =
    (assemblyOptions?.areGroupsValid &&
      Object.values(assemblyOptions.areGroupsValid)) ||
    []
  const areAssemblyGroupsValid = groupsValidArray.every(Boolean)

  return !areAssemblyGroupsValid
}

function getDefaultSeller(sellers?: ProductTypes.Seller[]) {
  if (!sellers) {
    return undefined
  }

  const defaultSeller = sellers.find(seller => seller.sellerDefault)

  if (defaultSeller) {
    return defaultSeller
  }

  return sellers[0]
}

const Wrapper = withToast(function Wrapper(props: Props) {
  const {
    isOneClickBuy,
    isOneClickBuy2,
    available,
    disabled,
    customToastUrl,
    showToast,
    customOneClickBuyLink,
    selectedSeller,
    unavailableText,
    text,
    customPixelEventId,
    addToCartFeedback = 'toast',
    onClickBehavior = 'add-to-cart',
    onClickEventPropagation = 'disabled',
  } = props
  const productContext = useProduct()
  const isEmptyContext = Object.keys(productContext ?? {}).length === 0

  const product = productContext?.product
  const itemsLength = product?.items?.length ?? 0
  const multipleAvailableSKUs = itemsLength > 1
  const selectedItem = productContext?.selectedItem
  const assemblyOptions = productContext?.assemblyOptions
  const seller =
    selectedSeller ?? getDefaultSeller(productContext?.selectedItem?.sellers)
  const selectedQuantity =
    productContext?.selectedQuantity != null
      ? productContext.selectedQuantity
      : 1

  const skuItems = useMemo(
    () =>
      props.skuItems ??
      mapCatalogItemToCart({
        product,
        selectedItem,
        selectedQuantity,
        selectedSeller: seller,
        assemblyOptions,
      }),
    [
      assemblyOptions,
      product,
      props.skuItems,
      selectedItem,
      selectedQuantity,
      seller,
    ]
  )

  const isAvailable = checkAvailability(isEmptyContext, seller, available)

  const isDisabled = checkDisabled(isEmptyContext, assemblyOptions, disabled)
  const areAllSkuVariationsSelected = Boolean(
    !isEmptyContext && productContext?.skuSelector?.areAllVariationsSelected
  )

  const productLink = {
    linkText: product?.linkText,
    productId: product?.productId,
  }

  const [hasGuarantee, setHasGuarantee] = useState(true);
  const [categoryId, setCategoryId] = useState('133')


  //DEFINIR LAS CATEGORIAS CON CORREO, VTEX
  useEffect(() => {
    if(product){
      if (product.categories[0].includes('Tecnología')){
        setCategoryId('130');
      }
    }
    console.log('category id:', categoryId);
  }, [product])
  
  useEffect(() => {
    if (product && product.description === 'ge') {
      setHasGuarantee(true);
    } else {
      setHasGuarantee(true);
    }
  }, [product]);

  useEffect(() => {
    console.log('is One click buy en wrapper:', isOneClickBuy, isOneClickBuy2);
  }, []);

  return (
    <div>
      <AddToCartButton
        text={text}
        skuItems={skuItems}
        isLoading={productContext?.loadingItem}
        disabled={isDisabled}
        showToast={showToast}
        available={isAvailable}
        isOneClickBuy={isOneClickBuy}
        isOneClickBuy2={isOneClickBuy2}
        customToastUrl={customToastUrl}
        unavailableText={unavailableText}
        customOneClickBuyLink={customOneClickBuyLink}
        allSkuVariationsSelected={areAllSkuVariationsSelected}
        productLink={productLink}
        onClickBehavior={onClickBehavior}
        onClickEventPropagation={onClickEventPropagation}
        multipleAvailableSKUs={multipleAvailableSKUs}
        customPixelEventId={customPixelEventId}
        addToCartFeedback={addToCartFeedback}
        hasGuarantee={hasGuarantee}
        hasSelectedGuarantee={true}
        categoryId={categoryId}
      />
    </div>

  )
})

Wrapper.schema = {
  title: 'admin/editor.add-to-cart.title',
}

export default Wrapper
