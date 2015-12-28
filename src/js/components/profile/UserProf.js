import React, { PropTypes, Component } from 'react';
import fetch from 'isomorphic-fetch';
import { CSRF_TOKEN, DOMAIN_NAME } from '../../../config/env';

class UserProf extends Component {
  constructor(props, context) {
    super(props, context);
    const { name, first_name, last_name, age, sex, postal_code, state, city, street, building} = this.props.user;
    this.state = {
      name: {value: name, err: false},
      first_name: {value: first_name, err: false},
      last_name: {value: last_name, err: false},
      age: {value: age, err: false},
      sex: {value: sex, err: false},
      post1: {value: postal_code.substr(0, 3), err: false},
      post2: {value: postal_code.substr(3, 6), err: false},
      state: {value: state, err: false},
      city: {value: city, err: false},
      street: {value: street, err: false},
      building: {value: building, err: false}
    };
  }

  componentWillReceiveProps(nextProps) {
    const { name, first_name, last_name, age, sex, postal_code, state, city, street, building} = nextProps.user;
    this.state = {
      name: {value: name, err: false},
      first_name: {value: first_name, err: false},
      last_name: {value: last_name, err: false},
      age: {value: age, err: false},
      sex: {value: sex, err: false},
      post1: {value: postal_code.substr(0, 3), err: false},
      post2: {value: postal_code.substr(3, 6), err: false},
      state: {value: state, err: false},
      city: {value: city, err: false},
      street: {value: street, err: false},
      building: {value: building, err: false}
    };
  }

  getAddress() {
    const post1 = this.state.post1.value;
    const post2 = this.state.post2.value;

    if (post1.length === 3 && post2.length === 4) {
      const request = {post1: post1, post2: post2};

      (function fetchAddress(set) {
        fetch(DOMAIN_NAME + '/api/getAddress', {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-Token': CSRF_TOKEN,
          },
          credentials: 'same-origin',
          body: JSON.stringify(request),
        })
          .then(response => response.json())
          .then(result =>
            set({
              state: {value: result.stateName, err: false},
              city: {value: result.city, err: false},
              street: {value: result.street, err: false}
            })
          )
          .catch(ex => ex);
      })(this.setState.bind(this));
    } else {
      console.log('郵便番号がおかしい');
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { name, first_name, last_name, age, sex, post1, post2, state, city, street, building} = this.state;
    const request = {
      name: name.value,
      first_name: first_name.value,
      last_name: last_name.value,
      age: age.value,
      sex: sex.value,
      postal_code: post1.value + post2.value,
      state: state.value,
      city: city.value,
      street: street.value,
      building: building.value
    };

    this.props.fetchUpdateUserProf(request);
  }

  handleChange(e) {
    const {name, value} = e.target;
    switch (name) {
    case 'name':
      if (!value) {
        this.setState({ name: {value: value, err: '必須項目です' }});
      } else {
        this.setState({ name: {value: value, err: false }});
      }
      break;
    case 'firstName':
      this.setState({ first_name: {value: value, err: false }});
      break;
    case 'lastName':
      this.setState({ last_name: {value: value, err: false }});
      break;
    case 'sex':
      this.setState({ sex: {value: value, err: false }});
      break;
    case 'age':
      if (/^[\d]{1,3}$/i.test(value)) {
        this.setState({ age: {value: value, err: false }});
      } else {
        this.setState({ age: {value: value, err: '無効な年齢です'}});
      }
      break;
    case 'post1':
      if (/^\d{3}$/i.test(value)) {
        this.setState({ post1: {value: value, err: false }});
      } else {
        this.setState({ post1: {value: value, err: '郵便番号が正しくありません'}});
      }
      break;
    case 'post2':
      if (/^\d{4}$/i.test(value)) {
        this.setState({ post1: {value: this.state.post1.value, err: false }});
      } else {
        this.setState({ post1: {value: this.state.post1.value, err: '郵便番号が正しくありません'}});
      }
      this.setState({ post2: {value: value, err: false }});

      break;
    case 'state':
      this.setState({ state: {value: value, err: false }});
      break;
    case 'city':
      this.setState({ city: {value: value, err: false }});
      break;
    case 'street':
      this.setState({ street: {value: value, err: false }});
      break;
    case 'building':
      this.setState({ building: {value: value, err: false }});
      break;
    default :
    }
  }

  render() {
    const { user } = this.props;
    const { name, first_name, last_name, age, sex, post1, post2, state, city, street, building} = this.state;

    let hasErr;
    if (name.err || age.err || post1.err || name.value === null) {
      hasErr = true;
    } else {
      hasErr = false;
    }

    return (
      <form className="form-horizontal" role="form" onChange={this.handleChange.bind(this)}>
        <div className={name.err ? 'form-group has-error' : 'form-group'}>
          <label htmlFor="name" className="col-sm-2 control-label">ユーザーID</label>
          <div className="col-sm-4">
            <input type="text" name="name" className="form-control" id=""
                   placeholder="" defaultValue={user.name} value={name.value}/>
          </div>
          {name.err && <div className="col-sm-4 help-block">{name.err}</div> }
        </div>
        <div className="form-group">
          <label htmlFor="firstName" className="col-sm-2 control-label">名前</label>
          <div className="row">
            <div className="col-sm-2">
              <input type="text" name="firstName" className="form-control"
                     placeholder="性" defaultValue={user.first_name} value={first_name.value}/>
            </div>
            <div className="col-sm-2">
              <input type="text" name="lastName" className="form-control"
                     placeholder="名" defaultValue={user.last_name} value={last_name.value}/>
            </div>
          </div>
        </div>
        <div className={age.err ? 'form-group has-error' : 'form-group'}>
          <label htmlFor="age" className="col-sm-2 control-label">年齢</label>
          <div className="col-sm-1">
            <input type="text" name="age" className="form-control" id=""
                   placeholder="" defaultValue={user.age} value={age.value}/>
          </div>
          {age.err && <div className="col-sm-4 help-block">{age.err}</div> }
        </div>
        <div className="form-group">
          <label htmlFor="sex" className="col-sm-2 control-label">性別</label>
          <div className="col-sm-1">
            <select name="sex" className="form-control" defaultValue={user.sex} value={sex.value}>
              <option value="0">男</option>
              <option value="1">女</option>
            </select>
          </div>
        </div>
        <div className={post1.err ? 'form-group has-error' : 'form-group'}>
          <label htmlFor="post1" className="col-sm-2 control-label">郵便番号</label>
          <div className="row">
            <div className="col-sm-2">
              <input type="text" name="post1" className="form-control"
                     placeholder="000" defaultValue={user.postal_code.substr(0, 3)} value={post1.value}/>
            </div>
            <div className="col-sm-2">
              <input type="text" name="post2"className="form-control"
                     placeholder="0000" defaultValue={user.postal_code.substr(3, 6)} value={post2.value}/>
            </div>
            <div className="col-sm-2">
              <button type="button" className="btn btn-default" onClick={this.getAddress.bind(this)}>
                住所を検索
              </button>
            </div>
            {post1.err && <div className="col-sm-3 help-block">{post1.err}</div>}
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label">住所</label>
          <div className="col-sm-3">
            <select className="form-control" name="state" defaultValue={user.state} value={state.value}>
              <option value="北海道">北海道</option>
              <option value="青森県">青森県</option>
              <option value="岩手県">岩手県</option>
              <option value="宮城県">宮城県</option>
              <option value="秋田県">秋田県</option>
              <option value="山形県">山形県</option>
              <option value="福島県">福島県</option>
              <option value="茨城県">茨城県</option>
              <option value="栃木県">栃木県</option>
              <option value="群馬県">群馬県</option>
              <option value="埼玉県">埼玉県</option>
              <option value="千葉県">千葉県</option>
              <option value="東京都">東京都</option>
              <option value="神奈川県">神奈川県</option>
              <option value="新潟県">新潟県</option>
              <option value="山梨県">山梨県</option>
              <option value="長野県">長野県</option>
              <option value="富山県">富山県</option>
              <option value="石川県">石川県</option>
              <option value="福井県">福井県</option>
              <option value="岐阜県">岐阜県</option>
              <option value="静岡県">静岡県</option>
              <option value="愛知県">愛知県</option>
              <option value="三重県">三重県</option>
              <option value="滋賀県">滋賀県</option>
              <option value="京都府">京都府</option>
              <option value="大阪府">大阪府</option>
              <option value="兵庫県">兵庫県</option>
              <option value="奈良県">奈良県</option>
              <option value="和歌山県">和歌山県</option>
              <option value="鳥取県">鳥取県</option>
              <option value="島根県">島根県</option>
              <option value="岡山県">岡山県</option>
              <option value="広島県">広島県</option>
              <option value="山口県">山口県</option>
              <option value="徳島県">徳島県</option>
              <option value="香川県">香川県</option>
              <option value="愛媛県">愛媛県</option>
              <option value="高知県">高知県</option>
              <option value="福岡県">福岡県</option>
              <option value="佐賀県">佐賀県</option>
              <option value="長崎県">長崎県</option>
              <option value="熊本県">熊本県</option>
              <option value="大分県">大分県</option>
              <option value="宮崎県">宮崎県</option>
              <option value="鹿児島県">鹿児島県</option>
              <option value="沖縄県">沖縄県</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="" className="col-sm-2 control-label"> </label>
          <div className="col-sm-8">
            <input type="text" name="city" className="form-control" id=""
                   placeholder="住所１" defaultValue={user.city} value={city.value}/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputPassword3" className="col-sm-2 control-label"> </label>
          <div className="col-sm-8">
            <input type="text" name="street" className="form-control" id=""
                   placeholder="住所２" defaultValue={user.street} value={street.value}/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputPassword3" className="col-sm-2 control-label"> </label>
          <div className="col-sm-8">
            <input type="text" name="building" className="form-control" id=""
                   placeholder="マンション名など" defaultValue={user.building} value={building.value}/>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <button type="button" className={hasErr ? 'btn btn-danger disabled' : 'btn btn-danger'}
                    onClick={this.handleSubmit.bind(this)}>
              変更を保存
            </button>
          </div>
        </div>
      </form>
    );
  }
}

UserProf.propTypes = {
  user: PropTypes.object.isRequired,
  fetchUpdateUserProf: PropTypes.func.isRequired
};

export default UserProf;
