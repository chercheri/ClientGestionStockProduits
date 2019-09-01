import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  constructor(private produitService : ProduitService, private fb : FormBuilder){
    this.produitForm = fb.group({
      reference: ['',Validators.required],
      quantite: '',
      prixUnitaire:''
    });

  }

  ngOnInit(){
    this.loadProduits();
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

}
