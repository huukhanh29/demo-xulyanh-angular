import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LuuAnhService } from 'src/app/service/luu-anh.service';
import { ThemLuuAnhComponent } from '../them-luu-anh/them-luu-anh.component';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-danh-sach-hinh-anh',
  templateUrl: './danh-sach-hinh-anh.component.html',
  styleUrls: ['./danh-sach-hinh-anh.component.css'],
})
export class DanhSachHinhAnhComponent implements OnInit {
  luuAnhList: any[] = [];
  //link hiển thị hình ảnh
  baseUrl = 'http://localhost:8080/api/file/anh/';
  constructor(private luuAnhService: LuuAnhService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadLuuAnhList();
  }

  loadLuuAnhList(): void {
    this.luuAnhService.getLuuAnhList().subscribe({
      next: (data) => {
        console.log(data)
        this.luuAnhList = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  openThemLuuAnhDialog(): void {
    const dialogRef = this.dialog.open(ThemLuuAnhComponent, {
      width: '400px', // Đặt kích thước theo ý muốn
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadLuuAnhList()
    });
  }

  taiFile(ma: any) {
    this.luuAnhService.downloadFile(ma).subscribe({
      next: (response) => {
        const blob = new Blob([response.body as Blob], {
          type: 'application/octet-stream',
        });
        // Extract filename from the Content-Disposition header
        const contentDisposition = response.headers.get('content-disposition');
        let filename = 'default-filename.ext'; // default filename if not provided
        if (contentDisposition) {
          const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(
            contentDisposition
          );
          if (matches != null && matches[1]) {
            filename = matches[1].replace(/['"]/g, '');
          }
        }
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        a.href = objectUrl;
        a.download = filename;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      },
      error: (err) => {
        alert('Tải thất bại')
      },
    });
  }
}
