# for src_path in ./src/images/*.jpg; 
#     do
#         # echo $(basename $src_path.*) 
#         file_name_with_extension=$(basename $src_path) 
#         # echo ${file_name_with_extension%.*}
#     done  


for src_path in /Users/new/Desktop/Temp_folder/imageTest/*.jpg; 
    do
        file_name_with_extension=$(basename $src_path)
        dst_path=/Users/new/Desktop/${file_name_with_extension}
        # guetzli --quality 84 $src_path $dst_path
        guetzli --quality 84 $src_path $dst_path
    done  