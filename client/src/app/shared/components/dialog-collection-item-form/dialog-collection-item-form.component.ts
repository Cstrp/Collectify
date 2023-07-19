import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Items, ItemsService } from '../../../modules';
import { Store } from '@ngrx/store';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { selectCurrentRoute } from '../../../store';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-dialog-collection-item-form',
  templateUrl: './dialog-collection-item-form.component.html',
})
export class DialogCollectionItemFormComponent implements OnInit, OnDestroy {
  public modalForm!: FormGroup;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  private modalSub!: Subscription;
  private collectionId!: string;
  private currLoc = this.store.select(selectCurrentRoute);
  constructor(
    private readonly fb: FormBuilder,
    private readonly itemsService: ItemsService,
    private readonly store: Store,
    private readonly dialogRef: MatDialogRef<DialogCollectionItemFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Items
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.currLoc.subscribe(data => {
      this.collectionId = data.url.split('/')[2];
    });
  }

  ngOnDestroy(): void {
    if (this.modalSub) {
      this.modalSub.unsubscribe();
    }
  }

  get fieldsGroup() {
    return this.modalForm.get('fields') as FormArray;
  }

  public onSubmit() {
    this.itemsService
      .createItem(this.collectionId, { ...this.modalForm.value })
      .subscribe(v => {
        console.log(v);
      });
    this.dialogRef.close();
  }

  public onClose() {
    this.dialogRef.close();
  }

  public addTag(evt: MatChipInputEvent) {
    const value = (evt.value || '').trim();

    if (value) {
      const tagCon = this.modalForm.get('tags');
      const tags = tagCon?.value || [];
      tags.push(value);
      tagCon?.setValue(tags);
    }

    evt.chipInput.clear();
  }

  public removeTag(tag: string) {
    const tagCon = this.modalForm.get('tags');
    const tags = tagCon?.value || [];
    const idx = tags.indexOf(tag);

    if (idx >= 0) {
      tags.splice(idx, 1);
      tagCon?.setValue(tags);
    }
  }

  public addFields() {
    const fieldsGroup = this.fb.group({
      type: [''],
      value: [''],
    });

    this.fieldsGroup.push(fieldsGroup);
  }

  public removeFields(idx: number) {
    this.fieldsGroup.removeAt(idx);
  }

  private initForm() {
    this.modalForm = this.fb.group({
      title: [this.data ? this.data.title : '', [Validators.required]],
      description: [
        this.data ? this.data.description : '',
        [Validators.required],
      ],
      fields: this.fb.array([]),
      tags: [this.data ? this.data.tags : '', []],
    });
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
}
