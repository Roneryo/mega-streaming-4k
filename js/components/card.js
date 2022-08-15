import { User } from "../controllers/User.js";

export let card = () => {
  let user = new User().getCurrentUser();
  console.log(user.products);
  let content = `
  <div class="card my-3 col-md-6 col-lg-3 col-sm-2 col-xs-2">
    <div class="card text-center" >
      <div class="card-body">
        <h6 class="card-title"></h6>
        <a id="" class="btn btn-primary " onclick=''></a>
      </div>
    </div>
  </div>`;
  //   let element = document.querySelector("#carrousel");
  //   element.innerHTML = content;
};
