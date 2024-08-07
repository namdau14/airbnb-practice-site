import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../Perks";
import axios from "axios";
import PhotosUploader from "../PhotosUploader";

export default function PlacesPage() {
    const { action } = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [photos, setPhotos] = useState([]);
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
                        <PhotosUploader photos={photos} onChange={setPhotos}/>
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