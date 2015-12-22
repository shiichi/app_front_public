export const Reserved = {
  path: 'reserved',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('../components/Reserved/Reserved.js'));
    });
  }
};

export const Reserve = {
  path: 'reserve',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('../components/Reserve/Reserve.js'));
    });
  }
};

export const Ticket = {
  path: 'ticket',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('../components/Ticket/Ticket.js'));
    });
  }
};

export const Log = {
  path: 'log',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('../components/Log/Log.js'));
    });
  }
};

export const Profile = {
  path: 'profile',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('../components/Profile/Profile.js'));
    });
  }
};
