import { useMemo } from 'react'
import { ProductItem } from './ProductItem'
import { List, ListRowRenderer } from 'react-virtualized'

type SearchResultsProps = {
  results: Array<{
    id: number
    title: string
    price: number
    formattedPrice: string
  }>
  totalPrice: number
  onAddToWishlist: (id: number) => void
}

export const SearchResults = ({
  results,
  onAddToWishlist,
  totalPrice,
}: SearchResultsProps) => {
  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem
          product={results[index]}
          onAddToWishlist={onAddToWishlist}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>Total: {totalPrice}</h2>
      {/* {results.map(product => (
        <ProductItem
          key={product.id}
          product={product}
          onAddToWishlist={onAddToWishlist}
        />
      ))} */}
      <List
        height={300}
        rowHeight={30}
        width={900}
        overscanRowCount={5}
        rowCount={results.length}
        rowRenderer={rowRenderer}
      />
    </div>
  )
}
