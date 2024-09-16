public class linear {

    public static void main(String[]args){
        int arr[]={1,2,3,4,5,6,7,8,9,0};
        int key=1;
        boolean flag=false;
        for(int i=0;i<arr.length;i++){
            if(arr[i]==key){
                System.out.print("Key found at index "+i);
                flag=true;
                break;
            }
        }
        if(flag!=true){
            System.out.println("Not Found");
        }
    }
    

}
