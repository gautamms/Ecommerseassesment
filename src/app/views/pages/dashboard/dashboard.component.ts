import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApexDataLabels, ApexFill, ApexGrid, ApexLegend, ApexMarkers, ApexOptions, ApexPlotOptions, ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import { retryWhen } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { CommonService } from 'src/app/services/common.service';
import { RegionService } from 'src/app/services/region.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: string[];
  dataLabels: ApexDataLabels;
  options: ApexOptions;
  nonAxisSeries: ApexNonAxisChartSeries;
  colors: string[];
  grid: ApexGrid;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  markers: ApexMarkers;
  stroke: ApexStroke;
  legend: ApexLegend;
  tooltip: ApexTooltip;
  fill: ApexFill;
  plotOptions: ApexPlotOptions;
  title: ApexTitleSubtitle;
};


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  menuItems: any;
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  userselected: any;
  count: any;
  products: any;
  categories: any;
  selectedCategory: string | null = null;
  filteredProducts = [];
  showModal = false;
  showFilterModal = false;
  selectedProduct: any = null;
  selectedQuantity: number = 1;
  constructor(private regionService: RegionService,
    private service: CommonService, private alertservice: AlertService,
    private router:Router
  ) {

  }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
  }

  getAllProducts() {
    this.regionService.getProducts().subscribe((response: any) => {
      if (response) {
        this.products = response
      }
      else {
        this.alertservice.error(response.htmlFormattedFailures)
      }
      ;
    });
  }

  getAllCategories() {
    this.regionService.getAllCategories().subscribe((response: any) => {
      if (response) {
        this.categories = response
      }
      else {
        this.alertservice.error(response.htmlFormattedFailures)
      }
      ;
    });
  }

  applyFilter() {
    this.filterProducts();
    this.showFilterModal = false; // Close the modal
  }

  // Clear the selected category
  clearFilter() {
    this.selectedCategory = null;
    this.filterProducts();
    this.showFilterModal = false; // Close the modal
  }

  filterProducts() {
    if (this.selectedCategory) {
      this.regionService.getCategoriesbyName(this.selectedCategory).subscribe(res => {
        this.filteredProducts = res;
      })
    } else {
      this.filteredProducts = this.products;
    }
  }

  openQuantityModal(product: any) {
    this.selectedProduct = product;
    this.selectedQuantity = 1; // Reset quantity
    this.showModal = true;
  }

  // Close Modal
  closeModal() {
    this.showModal = false;
    this.selectedProduct = null;
  }

 

  gotoProduct(category){
    this.router.navigate(['/product', category]);
  }

}
