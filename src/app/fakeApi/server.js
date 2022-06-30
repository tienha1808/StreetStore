import { createServer, Factory, hasMany, Model } from "miragejs"

export default createServer({
    models: {
        user: Model.extend({
            cart: hasMany('product')
        }),
        product: Model.extend({
            user: hasMany(),
        }),
    },
    
    factories: {
        product: Factory.extend({
            title(i) {
                return `Product ${i}`
            },
            price () {
                let min = 1
                let max = 100
                return Math.floor(Math.random()*(max - min + 1)) + min
            },
            description (i) {
                return `This is Product ${i}`
            },
            quantity: 1,
            category: 'men\'s clothing',
            image: 'https://cf.shopee.vn/file/1a32d71426b5299936d59909870e92b6',
            count () {
                let min = 100
                let max = 500
                return Math.floor(Math.random()*(max - min + 1)) + min
            },
            subtotal () {
                return this.quantity * this.price
            }
        })
    },

    seeds(server) {
        const product1 = server.create('product', {quantity: 3})
        const product2 = server.create('product', {quantity: 5})
        const product3 = server.create('product', {quantity: 1})
        const product4 = server.create('product', {quantity: 11})
        const product5 = server.create('product', {quantity: 8})


        server.create('user', {
            name: 'Ha Viet Tien',
            signInName: 'tien',
            password: '123456',
            phone: "0905905246",
            address: 'Da Nang',
            avatar: 'https://sudospaces.com/gaocung-com/2021/01/chim-vang-anh-an-gi-1.jpg',
            cart: [product1, product3, product5]
        })
        server.create('user', {
            name: 'Bia',
            signInName: 'bia',
            password: '987654',
            phone: "0903562255",
            address: 'Ho Chi Minh',
            cart: [product1, product2, product4]
        })
        server.createList('product', 10)
        server.createList('product', 13, {category: 'women\'s clothing', image: 'https://cf.shopee.vn/file/874ec20325154aa794dd0670a7bf24b6'})
        server.createList('product', 7, {category: 'jewelery', image: 'https://bazaarvietnam.vn/wp-content/uploads/2021/03/trang-suc-fine-jewelry-la-gi-cartier.jpg'})
        server.createList('product', 8, {category: 'electronics', image: 'https://hanoicomputercdn.com/media/product/65041_cpu_intel_core_i9_12900ks__1_.jpg'})
    },

  routes() {
    this.namespace = "api"

    this.get("/users", (schema) => {
        return schema.users.all()
    })

    this.get("/users/:id", (schema, request) => {
        let id = request.params.id
        
        return schema.users.find(id)
    })
    
    this.post('/users', (schema, request) => {
        let attrs = JSON.parse(request.requestBody)

        return schema.users.create(attrs)
    })

    this.patch('/users/:id', (schema, request) => {
        let newAttrs = JSON.parse(request.requestBody);
        let id = request.params.id;

        return schema.users.find(id).update(newAttrs);
    });
    
    this.get('/users/:id/cart', (schema, request) => {
        let user = schema.users.find(request.params.id)

        return user.cart
    })

    this.patch('/users/:id/cart', (schema, request) => {
        let user = schema.users.find(request.params.id)
        let newAttrs = JSON.parse(request.requestBody)
        user.cartIds = newAttrs

        return user.save()
    })

    this.get("/products", (schema, request) => {
        return schema.products.all()
    })

    this.get("/products/:id", (schema, request) => {
        let id = request.params.id
        
        return schema.products.find(id)
    })
  }
})