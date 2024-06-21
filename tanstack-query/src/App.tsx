// @ts-ignore
// import Todo from './components/Todo'
// import Projects from './components/Projects'
import Products from './components/Products'

function App() {

  // * Old way of data fetching
  /*
    const [data, setData] = useState([])

    useEffect(() => {
      axios.get('http://localhost:8080/todos')
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
    }, [])
    */

  return (
    <>
      {/* <Todo /> */}
      {/* <Projects /> */}
      <Products />
    </>
  )
}

export default App
