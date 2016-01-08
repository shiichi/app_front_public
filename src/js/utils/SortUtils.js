export function sortLogs(logs, page, orderBy, asc) {
  const begin = ((page - 1) * 3);
  const end = begin + 3;

  if(asc) {
    return logs.slice().sort(function(a,b){
      if(a.orderBy < b.orderBy) return 1;
      if(a.orderBy > b.orderBy) return -1;
      return 0;
    }).slice(begin, end);
  } else {
    return logs.slice().sort(function(a,b){
      if(a.orderBy < b.orderBy) return -1;
      if(a.orderBy > b.orderBy) return 1;
      return 0;
    }).slice(begin, end);
  }
}

export function filterLogsByMethod(logs, method) {
  return logs.filter(l => l.method = method)
}

export function filterLogsByAction(logs, action) {
  if(action = 'buy') {
    return logs.filter(l => l.action > 0)
  } else if(action = 'buy') {
    return logs.filter(l => l.action < 0)    
  } else {
    return log
  }
}
