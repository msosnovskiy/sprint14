const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
      } else res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.removeCard = (req, res) => {
  Card.findById(req.params.cardId)
    .then(async (card) => {
      const userId = req.user._id;
      const ownerId = card.owner._id.toString();
      if (ownerId === userId) {
        const element = await Card.findByIdAndDelete(req.params.cardId);
        res.send({ data: element });
      } else res.status(403).send({ message: 'Нет прав на удаление' });
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'TypeError') {
        res.status(400).send({ message: `Не удалось найти карточку с cardId - ${req.params.cardId}` });
      } else res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};
