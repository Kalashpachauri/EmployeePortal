const apiKeyAuth = (req, res, next) => {
    const apiKey = req.headers['empkey'];
    
    // Check if API key exists and matches the one in .env
    if (!apiKey || apiKey !== process.env.API_KEY) {
      return res.status(401).json({       
        error: 'Unauthorized: Invalid request or missing something'
      });
    }
    
    next();
  };
  
  module.exports = apiKeyAuth;