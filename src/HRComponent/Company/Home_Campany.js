import React from 'react'
import Header from './Header'
import HomeBanner from './HomeBanner'
import Footer from '../../Component/Footer'
import GetStarted from '../../Component/GetStarted'
import Newsletters from '../../Component/Newsletters'
import Client_Pagedata from './Client_Pagedata'
import NewsBlog from '../../Component/NewsBlog'
export default function Home_Campany() {
  return (
     <>
     <Header/>
     <HomeBanner/>
     <Client_Pagedata/>
     <Newsletters/>
     <Footer/>
     </>
  )
}
