import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { loadTopicsStart, selectTopic } from '../../../store/topic';
import { FileService, UploadService } from '../../services';
import { map, Observable, Subscription, tap } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Collection, CollectionService } from '../../../modules';
import { Store } from '@ngrx/store';
import {
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  addCollection,
  addCollectionFailure,
  updateCollection,
} from '../../../store/collection';

@Component({
  selector: 'app-dialog-collection-form',
  templateUrl: './dialog-collection-form.component.html',
})
export class DialogCollectionFormComponent implements OnInit, OnDestroy {
  @ViewChild('fileInput') fileInput!: ElementRef;

  public modalForm!: FormGroup;
  public filteredOptions$!: Observable<string[]>;

  private modalSub: Subscription = new Subscription();
  private filteredOptions: string[] = [];
  private image!: File;
  private imageUrl = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly fileService: FileService,
    private readonly collectionService: CollectionService,
    private readonly dialogRef: MatDialogRef<DialogCollectionFormComponent>,
    private readonly uploadService: UploadService,
    private readonly store: Store,
    @Inject(MAT_DIALOG_DATA) public data: Collection
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.store.dispatch(loadTopicsStart());
    this.loadTopics();

    this.filteredOptions$ = this.modalForm
      .get('theme')!
      .valueChanges.pipe(map(value => this.filterTopics(value || '')));
  }

  ngOnDestroy(): void {
    this.modalSub.unsubscribe();
  }

  onFileSelect(evt: Event) {
    const target = evt.target as HTMLInputElement;
    const file = (target.files as FileList)[0];
    const reader = new FileReader();

    this.image = file;
    reader.readAsDataURL(file);
  }

  get fieldsGroup() {
    return this.modalForm.get('fields') as FormArray;
  }

  onClose(): void {
    this.dialogRef.close();
  }

  public onSubmit() {
    if (this.modalForm.invalid) return;

    if (!this.image) {
      this.createCollectionWithoutImage();
      this.updateCollection();
    } else {
      this.createCollectionWithImage();
      this.updateCollection();
    }
  }

  public addField() {
    const fieldsGroup = this.fb.group({
      type: [''],
      value: [''],
    });

    this.fieldsGroup.push(fieldsGroup);
  }

  public removeField(idx: number) {
    this.fieldsGroup.removeAt(idx);
  }

  private initForm() {
    this.modalForm = this.fb.group({
      title: [this.data ? this.data.title : '', [Validators.required]],
      description: [
        this.data ? this.data.description : '',
        [Validators.required],
      ],
      theme: [this.data ? this.data.theme : '', [Validators.required]],
      fields: this.fb.array([]),
    });

    this.setFields();
  }

  private setFields() {
    const fieldsArr = this.fieldsGroup;
    const fields = this.data ? this.data.fields! : [];

    fields.forEach(field => {
      const fieldGrp = this.fb.group({
        type: [field.type],
        value: [field.value],
      });

      fieldsArr.push(fieldGrp);
    });
  }

  private loadTopics() {
    this.modalSub = this.store
      .select(selectTopic)
      .pipe(
        tap(topics => {
          this.filteredOptions = topics;
        })
      )
      .subscribe();
  }

  private filterTopics(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.filteredOptions.filter(opt =>
      opt.toLowerCase().includes(filterValue)
    );
  }

  private createCollectionWithoutImage() {
    this.store.dispatch(
      addCollection({
        collection: this.modalForm.value,
      })
    );
    this.dialogRef.close();
  }

  private createCollectionWithImage() {
    this.modalSub = this.uploadService.uploadFile(this.image).subscribe(
      res => {
        if (res.imageUrl) {
          this.store.dispatch(
            addCollection({
              collection: { ...this.modalForm.value, image: res.imageUrl },
            })
          );
        }
      },
      error => {
        this.store.dispatch(addCollectionFailure({ error }));
      },
      () => {
        this.dialogRef.close();
      }
    );
  }

  private updateCollection() {
    this.store.dispatch(
      updateCollection({
        id: this.data.id!,
        collection: {
          ...this.modalForm.value,
          image: this.imageUrl || '',
        },
      })
    );

    this.dialogRef.close();
  }
}
