import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { ShopService } from './shop.service';
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search', {static: false}) searchTerm: ElementRef;
  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  shopParams :ShopParams;
  totalCount: number;

  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price: High to Low', value: 'priceDesc'},
  ];

  constructor(private shopService: ShopService) {
    this.shopParams = this.shopService.getShopParams();
  }

  ngOnInit(): void {
    this.getProdcuts(true);
    this.getBrands();
    this.getTypes();
  }

  getProdcuts(useCache = false) {
    this.shopService.getProducts(useCache).subscribe((response) => {
      this.products = response.data;
      this.totalCount = response.count;
    }, error => {
      console.log(error)
    });
  }

  getBrands() {
    this.shopService.getBrands().subscribe((response) => {
      this.brands = [{id: 0, name: 'All'}, ...response];
    }, error => {
      console.log(error)
    });
  }

    getTypes() {
    this.shopService.getTypes().subscribe((response) => {
      this.types = [{id: 0, name: 'All'}, ...response];;
    }, error => {
      console.log(error)
    });
  }

  onBrandSelected(brandId: number) {
    const params = this.shopService.getShopParams();
    params.pageNumber = 1;
    params.brandId= brandId;
    this.shopService.setShopParams(params);
    this.getProdcuts();
  }

  onTypeSelected(typeId: number) {
    const params = this.shopService.getShopParams();
    params.pageNumber = 1;
    params.typeId= typeId;
    this.shopService.setShopParams(params);
    this.getProdcuts();
  }

  onSortSelected(sort: string) {
   const params = this.shopService.getShopParams();
    params.sort = sort;
    this.shopService.setShopParams(params);
    this.getProdcuts(true);
  }

  onPageChanged(event: any) {
    const params = this.shopService.getShopParams();
    if (params.pageNumber != event) {
      params.pageNumber = event;
      this.shopService.setShopParams(params);
      this.getProdcuts();
    }
  }

  onSearch() {
    const params = this.shopService.getShopParams();
    params.pageNumber = 1;
    params.search = this.searchTerm.nativeElement.value;
    this.shopService.setShopParams(params);
    this.getProdcuts();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.shopService.setShopParams(this.shopParams);
    this.getProdcuts();
  }
}
