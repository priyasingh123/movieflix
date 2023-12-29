import img from '../utils/image/movie-logo.jpg'
import '../utils/styles/style.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Navbar = ({setMovies}) => {
    const [filter, setFilter] = useState('all')
    const [page] = useState(1)

    useEffect(() => {
        const fetchMovies = async () => {
            const baseUrl = process.env.REACT_APP_BASEURL
            const apiKey = process.env.REACT_APP_APIKEY
            const url = `${baseUrl}/discover/movie?api_key=${apiKey}&primary_release_year=2012&page=${page}&vote_count.gte=100&sort_by=popularity.desc`

            const res = await fetch(url)
            const response = await res.json()
            console.log ('here',response)
            setMovies(response.results)
        }
        
        fetchMovies()
    },[])

    const handleFilter = (e) => {
        setFilter(e.target.id)
    }


    return (
        <div className="navbar">
            <img className="navbar-img" src={img} alt="logo"/>
            <label className='logo-title'>MOVIEFIX</label>
            <div className='menu-items'>
                <ul onClick={(e)=>handleFilter(e)}>
                    <Link className={`list-item`} to={"/"} ><li id="all" className={` category ${filter === 'all'?'background-red':''}`}>All</li> </Link>
                    <Link className={`list-item `} to={"/"} ><li id="action" className={` category ${filter === 'action'?'background-red':''}`}>Action</li> </Link>
                    <Link className={`list-item`} to={"/"} ><li id="comedy" className={` category ${filter === 'comedy'?'background-red':''}`}>Comedy</li> </Link>
                    <Link className={`list-item `} to={"/"} ><li id="horror" className={` category ${filter === 'horror'?'background-red':''}`}>Horror</li> </Link>
                    <Link className={`list-item`} to={"/"} ><li id="drama" className={` category ${filter === 'drama'?'background-red':''}`}>Drama</li> </Link>
                </ul>

            </div>
        </div>
    )
}

export default Navbar