// import React from 'react';
// import { Card, Badge } from 'reactstrap';
// import { NavLink } from 'react-router-dom';
// import classnames from 'classnames';
// import { ContextMenuTrigger } from 'react-contextmenu';
// import { Colxx } from 'components/common/CustomBootstrap';
// import { Pencil, Eject } from 'react-bootstrap-icons';
// import axios from 'axios';
// import swal from 'sweetalert';

// const ThumbListView = ({ product, isSelect, collect }) => {
//   console.log(product);
//   return (
//     <Colxx xxs="12" className="mb-3">
//       <ContextMenuTrigger id="menu_id" data={product.id} collRect={collect}>
//         <Card
//           // onClick={(event) => onCheckItem(event, product.id)}
//           className={classnames('d-flex flex-row', {
//             active: isSelect,
//           })}
//         >
//           <div className="pl-2 d-flex flex-grow-1 min-width-zero">
//             <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
//               <NavLink to={`?p=${product.id}`} className="w-40 w-sm-100">
//                 <p className="list-item-heading mb-1 truncate">
//                   {product.title}
//                 </p>
//               </NavLink>
//               <p className="mb-1 text-muted text-small w-15 w-sm-100">
//                 {product.category}
//               </p>
//               <p className="mb-1 text-muted text-small w-15 w-sm-100">
//                 {product.date}
//               </p>
//               <div className="w-15 w-sm-100">
//                 <Badge color={product.statusColor} pill>
//                   {product.status}
//                 </Badge>
//               </div>
//             </div>
//             <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
//               <div className="row">
//                 <div className="col-6">
//                   <Pencil color="royalblue" size={16} />
//                 </div>
//                 <div className="col-6">
//                   <Eject
//                     color="red"
//                     size={16}
//                     role="button"
//                     onClick={() => {
//                       console.log(
//                         `/admin/connect/interests/personality/${product.id}`
//                       );
//                       axios
//                         .delete(
//                           `/admin/connect/interests/personality/${product.id}`,
//                           {
//                             headers: {
//                               'x-access-token': JSON.parse(
//                                 localStorage.getItem('current_user')
//                               ).token,
//                             },
//                           }
//                         )
//                         .then((res) => {
//                           console.log(res);
//                           swal({
//                             title: 'Are you sure ??',
//                             // text: "Confirm",
//                             icon: 'warning',
//                             buttons: true,
//                             dangerMode: true,
//                           }).then((willDelete) => {
//                             if (willDelete) {
//                               swal(
//                                 'Poof! Your imaginary file has been deleted!',
//                                 {
//                                   icon: 'success',
//                                 }
//                               );
//                               window.location.href =
//                                 'http://localhost:3000/app/pages/product/thumb-list';
//                             } else {
//                               swal('Your imaginary file is safe!');
//                             }
//                           });
//                         });
//                       console.log(product.id);
//                     }}
//                   />
//                 </div>
//               </div>

//               {/* <CustomInput
//                 className="item-check mb-0"
//                 type="checkbox"
//                 id={`check_${product.id}`}
//                 checked={isSelect}
//                 onChange={() => {}}
//                 label=""
//               /> */}
//             </div>
//           </div>
//         </Card>
//       </ContextMenuTrigger>
//     </Colxx>
//   );
// };

// /* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
// export default React.memo(ThumbListView);
