const express = require("express")
const cors = require("cors")

const parquesRoutes = require("./routes/parques.routes")
const trilhasRoutes = require("./routes/trilhas.routes")
const eventosRoutes = require("./routes/eventos.routes")
const adminRoutes = require("./routes/admin.routes")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/parques", parquesRoutes)
app.use("/trilhas", trilhasRoutes)
app.use("/eventos", eventosRoutes)
app.use("/admin", adminRoutes)

app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001")
})