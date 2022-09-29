export type HTMLInput = Event & {
  currentTarget: EventTarget &
    (HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement);
};
