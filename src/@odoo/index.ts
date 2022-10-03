//@ts-nocheck
import axios from 'axios'

var Odoo = function (config) {
  config = config || {};
  this.baseURL = process.env.REACT_APP_API_URL;
  this.database = process.env.ODOO_DATABASE;
  this.username = config.username || null;
  this.password = config.password || null;
  this.session_id = config.session_id || null;
  this.context = config.context;
};
Odoo.prototype.authenticate = function (cb) {
  var body = JSON.stringify({
    params: {
      db: this.database,
      login: this.username,
      password: this.password,
    },
  });
  var requestConfig = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Content-Length": body.length,
    },
    data: body,
    withCredentials: false,
    baseURL:this.baseURL,
    url: "/web/session/authenticate",
  };
  axios.default(requestConfig).then(
    (response) => {
      if (response.data.error) {
        this.context = response.data.result?.user_context;
        cb(response.data.error, null);
      } else {
        cb(null, response.data.result);
      }
    },
    (error) => {
      cb(error, null);
    }
  );
};
Odoo.prototype.search = function (model, params, callback) {
  this._request(
    "/web/dataset/call_kw",
    {
      kwargs: {
        context: this.context,
      },
      model: model,
      method: "search",
      args: [params.domain],
    },
    callback
  );
};
Odoo.prototype.search_read = function (model, params, callback) {
  this._request(
    "/web/dataset/call_kw",
    {
      model: model,
      method: "search_read",
      args: [],
      kwargs: {
        context: this.context,
        domain: params.domain,
        offset: params.offset,
        limit: params.limit,
        order: params.order,
        fields: params.fields,
      },
    },
    callback
  );
};
Odoo.prototype.read = function (model, params, callback) {
  this._request(
    "/web/dataset/call_kw",
    {
      model: model,
      method: "read",
      args: [params.ids],
      kwargs: {
        fields: params.fields,
      },
    },
    callback
  );
};
Odoo.prototype.create = function (model, params, callback) {
  this._request(
    "/web/dataset/call_kw",
    {
      kwargs: {
        context: this.context,
      },
      model: model,
      method: "create",
      args: [params],
    },
    callback
  );
};
Odoo.prototype.update = function (model, id, params, callback) {
  if (id) {
    this._request(
      "/web/dataset/call_kw",
      {
        kwargs: {
          context: this.context,
        },
        model: model,
        method: "write",
        args: [[id], params],
      },
      callback
    );
  }
};

Odoo.prototype.delete = function (model, id, callback) {
  this._request(
    "/web/dataset/call_kw",
    {
      kwargs: {
        context: this.context,
      },
      model: model,
      method: "unlink",
      args: [[id]],
    },
    callback
  );
};
// Call RPC Controller Generic
Odoo.prototype.rpc_call = function (endpoint, params, callback) {
  this._request(endpoint, params, callback);
};
// Private functions
Odoo.prototype._request = function (path, params, cb) {
  params = params || {};
  var url = (path || "/") + "";
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (this.session_id) {
    headers["cookie"] = "session_id=" + this.session_id + ";";
  }
  var requestConfig = {
    method: "POST",
    headers: headers,
    data: JSON.stringify({
      jsonrpc: "2.0",
      id: new Date().getUTCMilliseconds(),
      method: "call",
      params: params,
    }),
    withCredentials: false,
    baseURL:this.baseURL,
    url: url,
  };

  axios.default(requestConfig).then(
    (response) => {
      if (response.data.error) {
        cb(response.data.error, null);
      } else {
        console.log(cb);
        cb(null, response.data.result);
      }
    },
    (err) => {
      cb(err, null);
    }
  );
};
// const odoo = new Odoo({
//   baseURL: process.env.REACT_APP_API_URL,
//   username: "bao.pham@fdssoft.com",
//   password: "1",
//   database:"lcm_builder"
// })
export default Odoo;