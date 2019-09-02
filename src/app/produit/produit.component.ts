import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'

import { ProduitService } from "./produit.service";
import { Produit } from "../shared/produit";

@Component({
  selector : 'app-produit',
  templateUrl : './produit.component.html',
  styleUrls : ['./produit.component.css']
})

export class ProduitComponent implements OnInit{

  produits : Produit[];
  produitForm : FormGroup;
  operation : string = "add";
  selectedProduit : Produit ;

  constructor(private produitService : ProduitService, private fb : FormBuilder, private route : ActivatedRoute){
    this.createForm()

  }

  ngOnInit(){
    this.initProduit();
    //this.loadProduits();
    this.produits = this.route.snapshot.data.produits
  }

  createForm(){
    this.produitForm = this.fb.group({
      reference: ['',Validators.required],
      quantite: '',
      prixUnitaire:''
    });
  }

  controlerReference():boolean{
    return this.produitForm.controls['reference'].invalid && (this.produitForm.controls['reference'].touched || this.produitForm.controls['reference'].dirty);
  }

  loadProduits(){
    this.produitService.getProduits().subscribe(
      data => {this.produits = data},
      error => {console.log('An error occured.')},
      () => {console.log('chargement des produits terminé.')}
    );
  }

  addProduit(){
    const p = this.produitForm.value;
    this.produitService.addProduit(p).subscribe(
      res => {
        this.initProduit();
        this.loadProduits();
      }
    );
  }

  updateProduit(){
    this.produitService.updateProduit(this.selectedProduit).subscribe(
      res => {
        this.initProduit();
        this.loadProduits();
      }
    );
  }

  deleteProduit(){
    this.produitService.deleteProduit(this.selectedProduit.reference).subscribe(
      res => {
        this.initProduit();
        this.loadProduits();
      },

    );
  }

  initProduit(){
    this.selectedProduit = new Produit();
    this.createForm();
  }


}
