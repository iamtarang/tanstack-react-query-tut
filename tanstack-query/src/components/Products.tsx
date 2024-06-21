import { Fragment, useState } from "react";
import { useProduct, useProducts } from "../services/queries"

const Products = () => {

	const [selectedProductId, setSelectedProductId] = useState<number | null>()

	const productsQuery = useProducts();
	const productQuery = useProduct(selectedProductId);


	return (
		<>
			{productsQuery.data?.pages.map((group, index) => (
				<Fragment key={index}>
					{group.map((product) => (
						<Fragment key={product.id}>
							<button onClick={() => setSelectedProductId(product.id)}>
								{product.name}
							</button>
							<br />
						</Fragment>
					))}
				</Fragment>
			))}
			<br />
			<div>
				<button
					onClick={() => productsQuery.fetchNextPage()}
					disabled={!productsQuery.hasNextPage || productsQuery.isFetchingNextPage}
				>
					{productsQuery.isFetchingNextPage
						? "Loading more... "
						: productsQuery.hasNextPage
							? "Load more"
							: "Nothing to load more"}
				</button>
			</div>
			<div>Selected Product:</div>
			{JSON.stringify(productQuery.data)}
		</>
	)
}

export default Products