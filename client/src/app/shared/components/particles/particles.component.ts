import { Component } from '@angular/core';
import {
  ClickMode,
  Engine,
  HoverMode,
  MoveDirection,
  OutMode,
} from 'tsparticles-engine';
import { loadFull } from 'tsparticles';
import { IParticlesProps } from 'ng-particles';

@Component({
  selector: 'app-particles',
  template: ` <ng-particles
    [options]="particlesOptions"
    [particlesInit]="particlesInit"
  />`,
})
export class ParticlesComponent {
  particlesOptions: IParticlesProps = {
    background: {
      color: {
        value: '#161719',
      },
    },
    fpsLimit: 120,
    autoPlay: true,
    fullScreen: {
      enable: true,
      zIndex: -1,
    },
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: ClickMode.push,
        },
        onHover: {
          enable: true,
          mode: HoverMode.repulse,
        },
        resize: false,
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 150,
          duration: 0.5,
        },
      },
    },
    particles: {
      color: {
        value: '#ffffff',
      },
      links: {
        color: '#ffffff',
        distance: 100,
        enable: true,
        opacity: 0.7,
        width: 0.3,
      },
      collisions: {
        enable: true,
        mode: 'bounce',
      },
      move: {
        direction: MoveDirection.none,
        enable: true,
        outModes: {
          default: OutMode.bounce,
        },
        random: true,
        speed: 4,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 777,
        },
        value: 55,
      },
      opacity: {
        value: 0.7,
      },
      shape: {
        type: 'polygon',
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
    detectRetina: true,
  };

  async particlesInit(engine: Engine): Promise<void> {
    await loadFull(engine);
  }
}
