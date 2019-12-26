import store from '@/store'
export default {
      loading(target, name, descriptor) {
          var oldValue = descriptor.value;
        
          descriptor.value = async function() {
            store.commit('SET_GLOADING',true)
            try {
              await oldValue.apply(this, arguments);
            } catch (error) {
              store.commit('SET_GLOADING',false)
            }
            
            store.commit('SET_GLOADING',false)
          };
        
          return descriptor;
      }
  }