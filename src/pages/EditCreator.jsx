import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../client'
import Modal from 'react-modal'

const EditCreator = ({data}) => {

    const [modalIsOpen, setIsOpen] = React.useState(false)

    function openModal() {
        setIsOpen(true)
    }
    
    function closeModal() {
        setIsOpen(false)
    }

    const {id} = useParams()
    const [creator, setCreator] = useState({id: null, name: "", youtube: "", twitter: "", instagram: "", description: "", image: ""})

    useEffect(() => {
        const result = data.filter(item => String(item.id) === id)[0]
        setCreator({name: result.name, youtube: result.youtube, twitter: result.twitter, instagram: result.instagram, description: result.description, image: result.image})
    }, [data, id])


    const handleChange = (event) => {
        const {name, value} = event.target;
        setCreator( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }
    
    const updateCreator = async (event) => {
        event.preventDefault();
        const { error } = await supabase
        .from('creators')
        .update({ name: creator.name, youtube: creator.youtube, twitter: creator.twitter, instagram: creator.instagram,  description: creator.description, image: creator.image})
        .eq('id', id)

        if (error) {
            console.log(error)
        }

        window.location = "/"
    }

    const deleteCreator = async (event) => {
        event.preventDefault();
        const { error } = await supabase
        .from('creators')
        .delete()
        .eq('id', id) 

        if (error) {
            console.log(error);
        }

        window.location = "/"
    }

    return (
        <div className="AddEditCreator">

            <form>
                <label>Name</label>
                <input type="text" id="name" name="name" value={creator.name} onChange={handleChange} required />

                <label>
                    Image
                    <p>Provide a link to an image of your creator. Be sure to include the http://</p>
                </label>
                <input type="text" id="image" name="image" value={creator.image} onChange={handleChange} required />

                <label>
                    Description
                    <p>Provide a description of the creator. Who are they? What makes them interesting?</p>
                </label>
                <textarea name="description" rows="3" cols="50" id="description" value={creator.description} onChange={handleChange} required></textarea>

                <h3>Social Media Links</h3>
                <p>Provide at least one of the creator&apos;s social media links.</p>

                <label>
                    <span className="fa-brands fa-youtube"></span> YouTube
                    <p>The creator&apos;s YouTube handle (without the @)</p>
                </label>
                <input type="text" id="youtube" name="youtube" value ={creator.youtube} onChange={handleChange} />

                <label>
                    <span className="fa-brands fa-twitter"></span> Twitter
                    <p>The creator&apos;s Twitter handle (without the @)</p>
                </label>
                <input type="text" id="twitter" name="twitter" value ={creator.twitter} onChange={handleChange} />

                <label>
                    <span className="fa-brands fa-instagram"></span> Instagram
                    <p>The creator&apos;s Instagram handle (without the @)</p>
                </label>
                <input type="text" id="instagram" name="instagram" value ={creator.instagram} onChange={handleChange} />

            </form>

            <div className="submit-or-delete">
                <button type="submit" onClick={updateCreator}>Submit</button>
                <button className="delete-button" onClick={openModal}>Delete</button>

            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Delete"
                className="delete-modal"
                overlayClassName="overlay"
            >
                <h2>⚠️ WAIT!!!! ⚠️</h2>
                <p>Are you sure you want to delete {creator.name}???</p>
                <button onClick={closeModal}>Nah, never mind</button>
                <button onClick={deleteCreator}>YES! Totally sure</button>
            </Modal>

        </div>
    )
}

export default EditCreator