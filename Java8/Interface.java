interface smartdevice {
  void poweron();
  void poweroff();
  void connecttowifi();
  void performaction();
}

class smartbulb implements smartdevice {
  public void poweron() {
    System.out.println("smart bulb is now on and glowing brightly!");
  }

  public void poweroff() {
    System.out.println("smart bulb is off, conserving energy.");
  }

  public void connecttowifi() {
    System.out.println("smart bulb connected to network: home-wifi-2.4g");
  }

  public void performaction() {
    System.out.println("changing bulb color to warm white.");
  }
}


public class Interface {
  public static void main(String[] args) {
    System.out.println("controlling smart devices:");
    System.out.println("---");

    smartdevice mybulb = new smartbulb();
    mybulb.poweron();
    mybulb.connecttowifi();
    mybulb.performaction();
    mybulb.poweroff();
    }
}