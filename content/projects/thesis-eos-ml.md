---
title: "ML-Driven Equation of State for Lennard-Jones Fluids"
tags: [Machine Learning, Thermodynamics, Python, Thesis]
---

## Abstract

Equations of state (EOS) are fundamental tools in chemical engineering for predicting the thermodynamic behavior of fluids. Traditional EOS models rely on empirical parameter fitting, which often fails to capture complex molecular interactions. This thesis presents a data-driven approach to developing an accurate and interpretable EOS for Lennard-Jones fluids using machine learning and symbolic regression.

## Methodology

1. **Data Generation:** Performed molecular dynamics simulations across a grid of reduced temperatures (T* = 0.7–6.0) and densities (ρ* = 0.05–1.2), generating thousands of state points.
2. **Feature Engineering:** Extracted virial coefficients, radial distribution function features, and thermodynamic response functions as input descriptors.
3. **Modeling:** Applied symbolic regression to discover compact mathematical expressions relating pressure, density, and temperature. Benchmarking against classical EOS models.

## Key Results

- Discovered a novel closed-form EOS expression that matches simulation data with high accuracy across the entire fluid region
- Outperforms classical Peng-Robinson EOS in the supercritical region
- The symbolic expression reveals physically interpretable temperature-density coupling terms not captured by classical EOS forms

## Impact

This work demonstrates that machine learning and symbolic regression can discover physically meaningful thermodynamic relationships from simulation data — opening the door to automated EOS development for complex fluids where theoretical models are unavailable.
