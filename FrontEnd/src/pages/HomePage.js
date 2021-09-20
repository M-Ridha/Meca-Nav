import React  from 'react'
import Article from '../component/Article'
import NavBar from '../component/NavBar'
import Weather from '../component/Weather'


import '../design/homePage.css'





const Home = () => {


    return (
        
        <div className='HomeContainer'>
                        

                <NavBar id="check"></NavBar>

                <section>
                    
                    <div className='weath'>
                        <Weather></Weather>
                    </div>

                    <Article ></Article>

                </section>

        </div>

    )
}


export default Home