import { Toast } from 'native-base';

class ErrorModal {
  static show(text) {
    Toast.show({
      supportedOrientations: [
        'portrait', 'landscape',
      ],
      text,
      position: 'bottom',
      buttonText: 'Ok',
    });
  }
}

export default ErrorModal;
