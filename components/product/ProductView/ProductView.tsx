import cn from 'classnames'
import { FC, useState } from 'react'
import s from './ProductView.module.css'
import { Button, Container } from '@components/ui'
import Image from "next/image"
import { Product } from '@common/types/product'
import { ProductSlider, Swatch } from "@components/product"
interface Props {
  product: Product
}
type AvailableChoices = "color" | "size" | string
type Choices = {
  [P in AvailableChoices]: string
}
const ProductView: FC<Props> = ({ product }) => {
  const [ choices, setChoices ] = useState<Choices>({})
    console.log(choices)
  return (
    <Container>
      <div className={cn(s.root, 'fit', "mb-5")}>
        <div className={cn(s.productDisplay, 'fit')}>
          <div className={s.nameBox}>
                <h1 className={s.name}>
              {product.name}
            </h1>
            <div className={s.price}>
              50
                {product.price.value}
               {product.price.currencyCode}
            </div>
          </div>
         <ProductSlider>
            { product.images.map(image =>
              <div key={image.url} className={s.imageContainer}>
                <Image
                  className={s.img}
                  src={image.url}
                  alt={image.alt}
                  width={1050}
                  height={1050}
                  quality="85"
                />
              </div>
            )}
          </ProductSlider>
        </div>
        <div className={s.sidebar}>
          <section>
               { product.options.map(option =>
              <div key={option.id} className="pb-4">
                <h2 className="uppercase font-medium">{option.displayName}</h2>
                <div className="flex flex-row py-4">
                  { option.values.map(optValue =>
                      <Swatch
                      key={`${option.id}-${optValue.label}`}
                      label={optValue.label}
                      color={optValue.hexColor}
                       variant={option.displayName}
                       onClick={()=>{
                        setChoices({
                          ...choices,
                          [option.displayName.toLowerCase()]: optValue.label.toLowerCase()
                        })
                       }}
                    />
                  )}
                </div>
              </div>
            )}
            <div className="pb-14 break-words w-full max-w-xl text-lg">
            { product.description }
            </div>
          </section>
          <div>
            <Button
                  className={s.button}
              onClick={() => alert("adding to cart")}>
               Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </Container>
  )
}
export default ProductView