const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const db = require('./utils/db');
const User = require('./models/User');
const Product = require('./models/Product');
const Orders = require('./models/Orders');
const userRouter = require('./routes/User');
const productRouter = require('./routes/Product');
const orderRouter = require('./routes/Order');
const miscRouter = require('./routes/Misc');

app.use(cors());
app.use(bodyParser.json());
app.use(userRouter);
app.use(productRouter);
app.use(orderRouter);
app.use(miscRouter);

User.hasMany(Orders, { constraints: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
Product.hasMany(Orders, { constraints: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
Orders.belongsTo(Product);
Orders.belongsTo(User);
db
// .sync({ force: true })
.sync()
.then(function connectionSuccessCallback() {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`App is running on PORT: ${PORT}`);
    });
})
.catch((err) => {
    throw err;
});