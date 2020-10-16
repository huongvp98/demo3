import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './style.scss';
function index(props) {
  useEffect(() => {
    props.loadCart().then((s) => window.print());
  });
  return (
    <div className="print-bill">
      <div className="title">HÓA ĐƠN</div>
      <table>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Giá</th>
            <th>Số lượng</th>
          </tr>
        </thead>
        <tbody>
          {props.listCart.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.cart.name}</td>
                <td>{item.cart.price}</td>
                <td>{item.amount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
const mapStateToProps = (state) => {
  const {
    cart: { listCart, isPrint },
  } = state;
  return { listCart: listCart || [], isPrint };
};
const mapDispatchToProps = ({ cart: { loadCart } }) => ({ loadCart });
export default connect(mapStateToProps, mapDispatchToProps)(index);
