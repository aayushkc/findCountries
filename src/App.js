
import Countries from './components/countries/Countries';
import './App.css';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { url } from './components/API/Api';
import Loading from './components/Utilities/Loading';
import AllCountries from './components/countries/AllCountries';
import IndividualCountry from './components/countries/IndividualCountry';
import ShowIndividualCountry from './components/countries/ShowIndividualCountry';

function App() {
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState()
  const [searchInput, setSearchInput] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  // const [searchedInput, setSearchedInput] = useState([])
  const [option, setOption] = useState('all')


  

  //Function to get all country data
  const getCountries =useCallback(async ()=>{
    if (option === "all") {
      setIsLoading(true)
      await axios(`${url}${option}`).then(res => {
        const data = res.data
        if (data) {
          setCountries(data)
          setIsLoading(false)
        }
      })
    }

    //Check if the option dropdown  is set to other than "all" and hit API accordingly
    if (option !== "all") {
      setIsLoading(true)
      await axios(`${url}region/${option}`).then(res => {
        const data = res.data
        if (data) {
          setCountries(data)
         setIsLoading(false)
        }
      })
    }

  },[option])
 
   // Call the function to get All countries from API
   useEffect(() => {
    getCountries()
  }, [getCountries])
  console.log(getCountries)


    //Check if the option dropdown or the initial state is set to "all" and hit API accordingly
   



  //Function to get all the letters typed in the input element which is extracted from Search Component
  const getInputChange =  useCallback(async (name)=>{
    setSearchInput(name)
    if(searchInput){
      setIsLoading(true)
    await axios(`https://restcountries.com/v3.1/name/${searchInput}`).then(res => {
      const data = res.data
      if (data) {
        setCountries(data)
        setIsLoading(false)
      }
    })
  }
  if(searchInput === ''){
    getCountries()
  }

  },[searchInput, getCountries])

  // Hit the API for Search data in input after every 200 millisecond
  useEffect(() => {
    const ss = setTimeout(() => {
      getInputChange()
    }, 200)
    return () => {
      clearTimeout(ss)
    }
  }, [getInputChange])
 

  //Function to get the indivudal countries according to their name
  const clickedCountry = (name) => {
    const trimmedName = name?.replace(/\s+/g, '%20')  //replaces space with %20 inorder to make router work
    setSelectedCountry(trimmedName)
  }
 
  //function to trigger the get all API after user clicks on back button of individual page
  const onShowSearchAndSelect = () => {
    getCountries()
  }


  
  const country = countries?.map(item => {
    const pop = item.population.toLocaleString()
    return <Countries
      key={item.name.common}
      name={item.name.common}
      flag={item.flags.svg}
      capital={item.capital}
      region={item.region}
      population={pop}
      isDarkMode ={isDarkMode}
      clickedCountry={clickedCountry}
    />
  }
  )
  const slect = countries?.map(item => {
    const pop = item.population.toLocaleString()
    if (item.name.common.replace(/\s+/g, '%20') === selectedCountry) {
      const currency = Object.entries(item.currencies).map(([key,value],i)=>value.name)
      const nativeName = Object.entries(item.name.nativeName).map(([key,value],i)=>{
        const val= `${value.common}, ` 
       return[...val]
    })

    const languages = Object.entries(item.languages).map(([key,value],i)=>{
      const val= `${value}, ` 
     return[...val]
  })
      return <IndividualCountry
        key={item.name.common}
        name={item.name.common}
        flag={item.flags.svg}
        capital={item.capital}
        region={item.region}
        population={pop}
        currencies ={currency}
        tld= {item.tld}
        subregion={item.subregion}
        nativeName={nativeName}
        languages ={languages}
        isDarkMode ={isDarkMode}
        countries={countries}
        bordersArr = {item.borders}
        clickedCountry={clickedCountry}
        showSearchAndSelect={onShowSearchAndSelect}
      />
    }

  })

  //Function to set the choosen option from Select component 
  const optionChange = (e) => {
    setOption(e.target.value)
  }

  return (
    <div className={`${isDarkMode ? "App-dark":"App-light"}`}>
      <header className={`${isDarkMode ? "App-header-dark":"App-header-light"} App-header`}>
        <div className='logo'><h3>Where in the world?</h3></div>
        <button className='theme--toogler' onClick={()=>setIsDarkMode(!isDarkMode)}>Dark Mode</button>
      </header>
      <section className='container main--body'>
        <BrowserRouter>
          <Routes>
            {/* Default page containing all countries data */}
            <Route path='/' element={
              <AllCountries country={country}
                optionChange={optionChange}
                getInputChange={getInputChange}
                searchInput={searchInput}
                isDarkMode ={isDarkMode}
                isLoading ={isLoading}
                 />}
            />

            {/* Page for indivdual country data */}
            <Route path={`/country`} element={<ShowIndividualCountry slect={slect} />}>
                       
                        <Route path=':country'element={<ShowIndividualCountry slect={slect} />}/>
              </Route>
          </Routes>
        </BrowserRouter>

      
      </section>
    </div>
  );
}

export default App;
