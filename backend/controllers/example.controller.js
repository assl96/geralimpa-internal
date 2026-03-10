const getAll = (req, res) => {
  res.json({ message: 'Obtener todos los registros' });
};

const getById = (req, res) => {
  const { id } = req.params;
  res.json({ message: `Obtener registro con id ${id}` });
};

const create = (req, res) => {
  const body = req.body;
  res.status(201).json({ message: 'Registro creado', data: body });
};

const update = (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({ message: `Registro ${id} actualizado`, data: body });
};

const remove = (req, res) => {
  const { id } = req.params;
  res.json({ message: `Registro ${id} eliminado` });
};

module.exports = { getAll, getById, create, update, remove };
