import { createServer, Model } from "miragejs";

// profile pictures
import pic1 from '../Assets/User Avatar.svg'
import pic2 from '../Assets/User Avatar 2.svg'
import pic3 from '../Assets/User Avatar 3.svg'

// slider images
import image1 from '../Assets/Sign-Up-Image.png'
import image2 from '../Assets/Sign-Up-Image-2.png'
import image3 from '../Assets/Sign-Up-Image-3.PNG'
import image4 from '../Assets/Sign-Up-Image-4.PNG'

export default function() {
    let server = createServer({
        models: {
            reviews: Model,
            images: Model, 
            users: Model
        }, 
        seeds(server) {
            server.create('review', {
                user: {
                    name: 'Sarah Andrews',
                    revenue: '$100k in revenue',
                    profileImage: pic1
                }, 
                text: 'Setting up my portfolio with Fiber took no more than 10 minutes. Since then, my portfolio has attracted a lot of clients and made me more than $100k.'
            }), 
            server.create('review', {
                user: {
                    name: 'Matthew Higgins',
                    revenue: '$20k in revenue', 
                    profileImage: pic2
                }, 
                text: 'I have been getting a LOT of leads ever since I used Fiber\'s premade templates, now I just need to work on my case studies and I\'ll be ready to go!'
            }),
            server.create('review', {
                user: {
                    name: 'Janice Dave',
                    revenue: '$30k in revenue',
                    profileImage: pic3
                }, 
                text: 'I only just started freelancing this year and I have already made more than I ever made in my full-time job. The templates are just so amazing.'
            }), 
            server.create('image', {image: image1})
            server.create('image', {image: image2})
            server.create('image', {image: image3})
            server.create('image', {image: image4})
            server.create('user', {
                name: 'John Doe', 
                email: 'john@example.com',
                password: 'jd123'
            })
            server.create('user', {
                name: 'Jane Louie',
                email: 'jane@example.com', 
                password: 'jn123'
            })
        }, 
        routes() {
            this.namespace = 'api'
            this.get('/reviews', (schema, request) => schema.reviews.all())
            this.get('/images', (schema, request) => schema.images.all())
            this.get('/users', (schema, request) => schema.users.all())
            this.post('/users', (schema, request) => {
                let attrs = JSON.parse(request.requestBody)
                return schema.users.create(attrs)
            })
        }
    })
    return server
}
