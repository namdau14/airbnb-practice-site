import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../Perks";
import axios from "axios";

export default function PlacesPage() {
    const { action } = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [photos, setPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);

    function inputHeader(text: string) {
        return (<h2 className='text-2xl mt-4'>{text}</h2>);
    }

    function inputDescription(text: string) {
        return (<p className='text-gray-500 text-sm'>{text}</p>)
    }

    function preInput(header: string, description: string) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        )
    }
    async function addPhotoByLink(ev: any) {
        ev.preventDefault();
        const {data: fileName} = await axios.post('/uploadByLink', {link: photoLink});
        setPhotos(prev => {
            return [...prev, fileName]
        })
        setPhotoLink('');
    }

    return (
        <div>
            {action !== 'new' && (
                <div className="text-center">
                    <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add new place
                    </Link>
                </div>
            )}
            {action === 'new' && (
                <div>
                    <form>
                        {preInput('Title', 'Name of your place, should be short and catchy')}
                        <input type='text' value={title} onChange={ev => setTitle(ev.target.value)} placeholder='title, for example: My lovely apt'/>
                        {preInput('Address', 'Where to find your place')}
                        <input type='text' value={address} onChange={ev => setAddress(ev.target.value)} placeholder='address'/>
                        {preInput('Photos', 'The more the better')}
                        <div className="flex gap-2">
                            <input type="text" value={photoLink} onChange={ev => setPhotoLink(ev.target.value)} placeholder={'Add using a link ....jpg'}/>
                            <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;photo</button>
                        </div>
                        <div className='mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
                            {photos.length > 0 && photos.map(link => (
                                <div>
                                    <img className="rounded-2xl" src={'http://localhost:4000/uploads' + link}/>
                                </div>
                            ))}
                            <button className="flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                                </svg>
                                Upload
                            </button>
                        </div>
                        {preInput('Description', 'Brief description of the place')}
                        <textarea value={description} onChange={ev => setDescription(ev.target.value)}/>
                        {preInput('Perks', 'Select the perks your place has')}
                        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                            <Perks selected={perks} onChange={setPerks}/>
                        </div>
                        {preInput('Extra info', 'House rules, etc,...')}
                        <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)}/>
                        {preInput('Check in/out times, max guests', 'Remember to leave a window for cleaning between guests')}
                        <div className="grid gap-2 sm:grid-cols-3">
                            <div>
                                <h3 className="mt-2 -mb-1">Check in time</h3>
                                <input type="text" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} placeholder="14:00"></input>
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Check out time</h3>
                                <input type="text" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} placeholder="12:00"></input>
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Max guests</h3>
                                <input type="number" value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)}></input>
                            </div>
                        </div>
                        <div>
                            <button className="primary my-4">Save</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}