const express = require('express');
const router = express.Router();

// GET /api/events
router.get('/', (req, res) => {
  const events = [
    {
      id: 1,
      title: 'Stadium Tour - Casablanca',
      date: '2025-06-10',
      city: 'Casablanca',
      image: '/api/images/event'
    },
    {
      id: 2,
      title: 'Fan Zone Opening - Marrakech',
      date: '2025-06-12',
      city: 'Marrakech',
      image: '/api/images/event'
    },
    {
      id: 3,
      title: 'Cultural Night - Tangier',
      date: '2025-06-15',
      city: 'Tangier',
      image: '/api/images/event'
    }
  ];

  res.json({ success: true, data: events });
});

module.exports = router;
