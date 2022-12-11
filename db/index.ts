import {Pool} from 'pg';
const pool = new Pool({
    host:process.env.DB_HOST,
    user:process.env.DB_HOST,
    database:process.env.DB_NAME,
    password:process.env.DB_PASSWORD,
    port:parseInt(process.env.DB_PORT || '5432')
})

const connectDB = async () => {
    try {
        await pool.connect()
        
    } catch (err) {
        console.log(err)
    }
}

connectDB()



export default pool