# DEV NOTES

## Button

Always create IonButton while specifying **_color_** and **_fill_**.  
If there is an icon, always set **_slot_** to **_end_**.

Example:

```html
<IonButton color="primary" fill="solid">
  <IonIcon slot="end" :icon="importedFromIonicons"></IonIcon>
  Click Me!
</IonButton>
```
