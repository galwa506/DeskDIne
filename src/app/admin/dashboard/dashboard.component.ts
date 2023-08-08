import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from 'src/app/services/user.service';
import { MenuService } from 'src/app/services/menu.service';
import { Menu } from '../../model/menu.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['no', 'name', 'price'];
  dataSource = new MatTableDataSource<Menu>();

  totalUsers!: number;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private userService: UserService,
    private menuService: MenuService
  ) {}
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getUserCount();
    this.fetchMenu();
  }
  getUserCount() {
    this.userService.getUserCount().subscribe((count: number) => {
      this.totalUsers = count;
    });
  }
  fetchMenu() {
    this.menuService.fetchMenu().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  getSerialNumber(index: number): number {
    return index + 1 + this.paginator.pageIndex * this.paginator.pageSize;
  }
}
