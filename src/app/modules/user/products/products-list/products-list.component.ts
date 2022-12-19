import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { CustomService } from 'src/app/core/services/custom.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  public productsList: any;
  public productSlug: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private customService: CustomService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.productSlug = params.get('slug');
      this.getAllProducts();
    });
  }

  getAllProducts(): void {
    this.apiService.doGet('products/read/subcategory/' + this.productSlug).subscribe((res: any) => {
      if (res.type == "success") {
        this.productsList = res.data;
      } else {
        this.customService.openSnackBar(res.message);
      }
    });
  }
}
