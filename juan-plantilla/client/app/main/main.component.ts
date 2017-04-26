const angular = require('angular');
const ngRoute = require('angular-route');
import routing from './main.routes';
import Base from "../../components/object/base/Base";

export class MainController extends Base{
  private $location: any;
  /*@ngInject*/
  constructor($rootscope:any, $location:any, Tb:any) {
    super($rootscope,Tb);
    this.$location = $location;
  }

  $onInit() {
    this._Tb.hideToolbar();
		this._Tb.hideMenuBar();
		this.setToolbarOption();
  }

  public login():void{
      this.$location.path('/login');
  }
}

export default angular.module('plantillaApp.main', [
  ngRoute])
    .config(routing)
    .component('main', {
      template: require('./main.html'),
      controller: MainController,
      controllerAs: 'ac'
    })
    .name;
