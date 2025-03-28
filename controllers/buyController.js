const fs = require('fs');
const file = 'buys.json';

const readData = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    resolve([]);  // Si el archivo no existe, devolvemos un array vacío
                } else {
                    reject('Error al leer el archivo');
                }
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
};

const saveData = (data) => {
    return new Promise((resolve, reject) => {
        const dataToSave = JSON.stringify(data, null, 2);
        fs.writeFile(file, dataToSave, (err) => {
            if (err) {registerBuy
                reject('Error al guardar los datos');
            } else {
                resolve();
            }
        });
    });
};

// a. Crear pedido
exports.registerBuy = async (req, res) => {
    try {
        // Recepción de los datos del pedido
        const newBuy = req.body;

        // Validar que los datos requeridos estén presentes
        if (!newBuy.buyer_name || !newBuy.client_id || !newBuy.address || !newBuy.sku || !newBuy.quantity || !newBuy.delivery_date) {
            return res.status(400).json({ msg: 'Faltan datos en la solicitud.' });
        }

        // Leer los datos actuales
        const buys = await readData();

        // Generar un ID único basado en el último ID en el arreglo
        newBuy.id = buys.length > 0 ? buys[buys.length - 1].id + 1 : 1;
        // Forzamos el estado inicial del pedido
        newBuy.status = 1;

        // Agregar la nueva compra al arreglo
        buys.push(newBuy);

        // Guardar los datos actualizados en el archivo json
        await saveData(buys);

        // Respuesta registro del pedido
        res.status(201).json({
            msg: 'Compra realizada con éxito.',
            data: newBuy,
        });
    } catch (err) {
        // Respuesta error en registro del pedido
        console.error(err);
        res.status(500).json({ msg: 'Error al procesar la solicitud.' });
    }
};

exports.updateBuy = async (req, res) => {
    try {
        // Recepción del ID del pedido
        const id = req.params.id;
        // Recepción de los nuevos datos para el pedido
        const updatedData = req.body;

        // Lectura del archivo json con los pedidos
        const buys = await readData();

        // Busqueda del pedido con parseInt para asegurar el tipo correcto en el id
        const buyIndex = buys.findIndex(buy => buy.id == parseInt(id));

        // Evaluación de la existencia del pedido y respuesta correspondiente
        if (buyIndex === -1) {
            res.status(404).json({
                msg: 'Pedido no encontrado.',
            });
        } else {
            // Actualización de datos del pedido
            buys[buyIndex] = { ...buys[buyIndex], ...updatedData };
    
            // Guardamos los datos actualizados
            await saveData(buys);
    
            // Respuesta con el pedido actualizado
            res.status(200).json({
                msg: 'Pedido actualizado con éxito.',
                data: buys[buyIndex],
            });
        }
    } catch (err) {
        // Respuesta error en proceso de actualización del pedido
        console.error(err);
        res.status(500).json({ msg: 'Error al procesar la solicitud.' });
    }
};
