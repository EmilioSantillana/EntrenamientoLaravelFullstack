import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const BookCreate = () => {   
    const router = useRouter()
    const [bookTitle, setBookTitle] = useState('')
    const [errors, setErrors] = useState([])
    const [submitting, setSubmitting] = useState(false)

    async function handleSubmit(e){
        e.preventDefault()
        setSubmitting(true)
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/books`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                title: bookTitle
            })
        })

        if(res.ok){
            setErrors([])
            setBookTitle('')
            return router.push('/libros')
        }
        else{
            const data = await res.json()
            setErrors(data.errors)
            setSubmitting(false)
        }
    }

    return (
        <div>
            <h1>Crear libro</h1>
            <form onSubmit={handleSubmit}>
                <input 
                onChange={(e) => setBookTitle(e.target.value)}
                value = {bookTitle}
                disabled={submitting}
                type="text"
                data-cy="input-book-title"></input>
                <button 
                disabled={submitting}
                data-cy="button-submit-book"
                >
                    {submitting ? 'Enviando...' : 'Enviar'}
                </button>
                {errors.title && (
                    <span style={{
                        color: 'red', display: 'block'
                    }}>{errors.title}</span>
                )}
            </form>
            <br/>
            <Link href="/libros">Libros</Link>
        </div>
    );
}

export default BookCreate;