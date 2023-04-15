

function checkMaintainerRole(req, res, next){
  if (req.user.role === 'mantainer') {
    // User has "manntainer" role, allow request to proceed
    next();
  } else {
    // User does not have "mantainer" role, send 403 Forbidden response
    res.status(403).send('Forbidden');
  }
};

 export default checkMaintainerRole;