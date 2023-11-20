import styles from '../../../page.module.css'
import ProductSearchResults from '../../../components/product/ProductSearchResults';


export default function SearchPage({ params, }: { params: { searchTerm: string } }) {
    const searchValue = params.searchTerm;
    return (
        <main className={styles.main}>
            <ProductSearchResults
                searchTerm={searchValue}
            />
        </main>
    )
}