import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { blankSpaceValidator } from 'src/shared/validators/blank-space-validator';
import * as $ from 'jquery';
import { PatientService } from 'src/shared/services/patient.service';
import { Gender, Image, Patient } from 'src/shared/models/patient';
import {MessageService} from 'primeng/api';
@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css'],
})
export class AddPatientComponent implements OnInit {
  @Input() patientData!: Patient;
  @Output() patientAdd: EventEmitter<null> = new EventEmitter<null>();
  patientId: number = 0;
  addPatientForm = new FormGroup({
    patientCode: new FormControl(),
    firstName: new FormControl('', [
      Validators.required,
      blankSpaceValidator.validate,
    ]),
    middleName: new FormControl('', [
      blankSpaceValidator.validate,
      blankSpaceValidator.validate,
    ]),
    surname: new FormControl('', [
      Validators.required,
      blankSpaceValidator.validate,
      blankSpaceValidator.validate,
    ]),
    mailId: new FormControl('', [
      Validators.required,
      blankSpaceValidator.validate,
      Validators.email,
    ]),
    contactNo: new FormControl('', [
      Validators.required,
      blankSpaceValidator.validate,
      Validators.minLength(10),
    ]),
    gender: new FormControl(),
    age: new FormControl('', [Validators.required]),
  });
  uploadedDocuments: any;
  imageDocument!: Image;
  constructor(
    private patientService: PatientService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.initialiseForm();
  }

  initialiseForm(): void {
    this.addPatientForm.patchValue({ gender: Gender.Male });
    this.addPatientForm.patchValue({ age: '0' });
  }
  ngOnChanges(changes: SimpleChanges) {
    var viewData = changes['patientData'].currentValue;
    if (viewData) {
      this.addPatientForm.patchValue({ patientCode: viewData.patientCode });
      this.addPatientForm.patchValue({ firstName: viewData.firstName });
      this.addPatientForm.patchValue({ middleName: viewData.middleName });
      this.addPatientForm.patchValue({ surname: viewData.surname });
      this.addPatientForm.patchValue({ mailId: viewData.emailId });
      this.addPatientForm.patchValue({
        contactNo: viewData.contactNumber.toString(),
      });
      this.addPatientForm.patchValue({ gender: viewData.gender });
      this.addPatientForm.patchValue({ age: viewData.age.toString() });
      let fileDetails = {
        url: "data:image/png;base64,"+viewData.image.imagePath,
        name: viewData.image.imageName,
        preview: true,
      };
      this.uploadedDocuments = fileDetails;
    }
  }
  get e() {
    return this.addPatientForm.controls;
  }
  enumKey(value: string): string {
    return Gender[parseInt(value)];
  }
  enumValue(): Array<string> {
    var keys = Object.keys(Gender);
    return keys.slice(0, keys.length / 2);
  }
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(
    event: KeyboardEvent
  ) {
    event.stopImmediatePropagation();
    this.closeSidePanel();
  }
  closeSidePanel() {
     if (!this.addPatientForm.dirty) {
           this.clearForm();
    } else {
       this.clearForm();
     }
  }

  /**
   * Clear form values
   */
  clearForm() {
    this.addPatientForm.reset();
    // this.imageDocument = {} as DocumentInfo;
    //this.myInputVariable.nativeElement.value = '';
    $('body').removeClass('show-sidepanel');
    $('.side-panel-right').removeClass('active');
    $('#inputBasicDescriptionBannerId').attr('style', '');
    this.removeImage();
    // this.uploadedDocuments =;
  }

  onSubmit() {
    var data = this.addPatientForm.value;
    this.patientData.firstName = data.firstName
      ? data.firstName.toString()
      : '';
    this.patientData.middleName = data.middleName
      ? data.middleName.toString()
      : '';
    this.patientData.surname = data.surname ? data.surname.toString() : '';
    this.patientData.contactNumber = data.contactNo
      ? data.contactNo.toString()
      : '';
    this.patientData.emailId = data.mailId ? data.mailId.toString() : '';
    this.patientData.gender = data.gender ? parseInt(data.gender) : Gender.Male;
    this.patientData.age = data.age ? parseInt(data.age) : 0;
    this.patientData.image = this.imageDocument;
    if(this.patientData.patientId>0){
      this.patientService.UpdatePatient(this.patientData).subscribe((res) => {
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: "Update Succssfully"
        });
        this.clearForm();
      });
    }
    else{
     
      // this.patientData.Image.ImageName="dsdsdd";
      // this.patientData.Image.ImagePath="sssssssss";
      this.patientService.CreatePatient(this.patientData).subscribe((res) => {
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: "Added Succssfully"
        });
        this.patientAdd.emit();
        this.clearForm();
      });
    }
  
  }

  detectFiles(event: any) {
    let files = event.target.files;
    if (files) {
      var i = 0;
      let allowed = ['image/x-png', 'image/jpeg', 'image/jpg', 'image/png'];
      var error = false;
      var errorSize = false;
      var errorDim = false;
      for (let file of files) {
        if (allowed.indexOf(file.type) !== -1) {
          this.imageReader(file).then((x) => {
            this.imageDocument = {} as Image;
            this.imageDocument.imagePath = x.replace(
              /^data:image\/[a-z]+;base64,/,
              ''
            );
            this.imageDocument.imageName = file.name;
          });

          i++;
        } else {
          /* not allowed extensions */
          error = true;
        }
      }
    }
  }

  imageReader(file: any): Promise<any> {
    return new Promise<any>((resoleve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = (e: any) => {
        const dataUrl = e.target.result;
        let fileDetails = {
          url: dataUrl,
          name: file.name,
          preview: true,
          userfile: file,
        };
        this.uploadedDocuments = fileDetails;
        resoleve(reader.result);
      };
      reader.onerror = (x) => {
        reject(x);
      };
    });
  }
  removeImage() {
    this.uploadedDocuments = null;
    this.imageDocument = {} as Image;
    $('#imageDocument').val('');
    this.initialiseForm();
  }
}
